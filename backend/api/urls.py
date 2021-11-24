from django.urls import path

from .views import RegisterView, PostAPIView, PostDetail, LikePost, CommentList,\
    ProfileList, ProfileDetail, DiscoverView, FollowProfile, SavePost, SavedList

urlpatterns = [
    path('', PostAPIView.as_view()),
    path('discover/', DiscoverView.as_view()),
    path('<int:pk>/', PostDetail.as_view()),
    path('<int:pk>/likes/', LikePost.as_view()),
    path('<int:pk>/save/', SavePost.as_view()),
    path('<int:pk>/comments/', CommentList.as_view()),
    path('profiles/', ProfileList.as_view()),
    path('profiles/<int:pk>/', ProfileDetail.as_view()),
    path('profiles/<int:pk>/posts_saved/', SavedList.as_view()),
    path('profiles/<int:pk>/follow/', FollowProfile.as_view()),
    path('rest-auth/register/', RegisterView.as_view()),
]
