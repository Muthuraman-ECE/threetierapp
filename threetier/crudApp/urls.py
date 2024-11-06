from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [ 
        path('emp', views.emp),  
        path('show',views.show, name= "show"),  
        path('delete/<str:id>', views.destroy),
        path("", views.check)
]
