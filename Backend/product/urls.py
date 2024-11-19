from django.urls import path
from . import views

urlpatterns = [
    path('',views.ProductsView.as_view(),name='products'),
    path('product-detail/<pk>/',views.ProductDetailView.as_view(),name='product-detail'),
     path('update-stock/<int:subvariant_id>/', views.UpdateStockView.as_view(), name='update-stock'),
    path('update-stock/', views.UpdateStockView.as_view(), name='update-stock'),
    path('remove-stock/<int:subvariant_id>/', views.RemoveStockView.as_view(), name='remove-stock'),
]