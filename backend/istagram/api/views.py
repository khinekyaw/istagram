from django.contrib.auth.models import User
from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from account.models import Profile
from posts.models import Post, Comment
from .serializers import PostSerializer, LikePostSerializer, \
    CommentSerializer, ProfileSerializer, ProfileDetailSerializer, RegisterSerializer
from .permissions import IsAuthorOrReadOnly


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer


class PostAPIView(generics.ListCreateAPIView):
    """
    List all posts, or create a new post.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        profile = self.request.query_params.get('profile')
        search = self.request.query_params.get('search')

        if search:
            return Post.objects.filter(caption__icontains=search)
        if profile:
            return Post.objects.filter(profile=profile)
        return Post.objects.all()

    def perform_create(self, serializer):
        profile = Profile.objects.get(user=self.request.user)
        serializer.save(profile=profile)


class DiscoverView(APIView):
    """
    List all posts for followed profiles.
    """

    def get(self, request, format=None):
        following_profiles = Profile.objects.get(
            user=request.user).following.all()
        posts = Post.objects.filter(profile__in=following_profiles)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Post detail, only author can edit or delete the post.
    """
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class LikePost(generics.RetrieveUpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = LikePostSerializer

    def perform_update(self, serializer):
        profile = Profile.objects.get(user=self.request.user)
        post = Post.objects.get(id=self.kwargs['pk'])
        if post.users_like.filter(id=profile.id).exists():
            post.users_like.remove(profile)
        else:
            post.users_like.add(profile)


class SavedList(APIView):
    def get(self, request, pk, format=None):
        profile = Profile.objects.get(user=pk)
        posts = profile.images_saved.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class SavePost(APIView):
    def get(self, request, pk, format=None):
        profile = Profile.objects.get(user=request.user)
        posts = profile.images_saved.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        try:
            profile = Profile.objects.get(user=request.user)
            post = Post.objects.get(id=pk)
            post.users_save.add(profile)
            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CommentList(generics.ListCreateAPIView):
    """
    List all comments of post id='pk', or 
    create a new comment on post(id='pk').
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(post=self.kwargs['pk'])

    def perform_create(self, serializer):
        profile = Profile.objects.get(user=self.request.user)
        post = Post.objects.get(id=self.kwargs['pk'])
        serializer.save(post=post, profile=profile)


class ProfileList(APIView):
    """
    List all profiles.
    """

    def get(self, request, format=None):
        type_ = self.request.query_params.get('type')

        if type_ and type_ == 'suggession':
            this_profile = Profile.objects.get(user=request.user)
            followed = this_profile.following.all()
            profiles = Profile.objects.exclude(
                id__in=followed).exclude(id=this_profile.id)
        else:
            profiles = Profile.objects.all()

        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)


class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Profile details, or edit profile.
    """
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Profile.objects.all()
    serializer_class = ProfileDetailSerializer


class FollowProfile(APIView):
    def get(self, request, pk, format=None):
        profile = Profile.objects.get(user=pk)
        serializer = ProfileDetailSerializer(profile)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        try:
            this_profile = Profile.objects.get(user=request.user)
            target_profile = Profile.objects.get(user=pk)
            this_profile.following.add(target_profile)
            target_profile.followers.add(this_profile)
            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
