from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.redirectToStartPage),
    path('counter', views.updateCounter),
    path('requirements', views.requirementsPage),
    path('start', views.startPage),
    path('story/<str:code>', views.storyPage),
    path('ending/<str:code>', views.endingPage),
]
