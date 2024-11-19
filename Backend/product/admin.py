from django.contrib import admin
from .models import Products, Stock, SubVariant, Variants

admin.site.register(Products)

admin.site.register(SubVariant)

admin.site.register(Variants)

admin.site.register(Stock)