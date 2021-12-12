from django.contrib.auth.models import User
from account.models import Profile
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password


from posts.models import Post, Comment


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,  required=True, validators=[validate_password])
    password2 = serializers.CharField(
        write_only=True, required=True
    )

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()

        # create a profile
        profile = Profile.objects.create(
            user=user, name=validated_data['username'])
        profile.save()
        return user


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="profile.user.username", read_only=True)

    def get_avatar(self, obj):
        try:
            return obj.profile.avatar.url
        except:
            return

    avatar = serializers.SerializerMethodField('get_avatar')

    class Meta:
        model = Comment
        fields = ('id', 'username', 'profile', 'avatar', 'body',)
        extra_kwargs = {
            'profile': {'read_only': True}
        }


class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="profile.user.username", read_only=True)
    last_comment = CommentSerializer(read_only=True)

    def get_avatar(self, obj):
        try:
            return self.context['request'].build_absolute_uri(obj.profile.avatar.url)
        except:
            return

    avatar = serializers.SerializerMethodField('get_avatar')

    class Meta:
        model = Post
        fields = ('id', 'caption', 'image', 'users_like', 'users_save',
                  'username', 'profile', 'avatar', 'last_comment')
        extra_kwargs = {
            'profile': {'read_only': True},
            'users_like': {'read_only': True}
        }


class LikePostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'users_like')
        extra_kwargs = {
            'users_like': {'read_only': True}
        }


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username", read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'username', 'name', 'avatar')
        extra_kwargs = {
            'name': {'read_only': True},
            'avatar': {'read_only': True},
        }


class ProfileDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username", read_only=True)
    post_count = serializers.IntegerField(source='posts.count', read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'username', 'name', 'avatar',
                  'post_count', 'followers', 'following')
        extra_kwargs = {
            'followers': {'read_only': True},
            'following': {'read_only': True},
        }
