import uuid
from django.db import models
from authentication.models import User
from versatileimagefield.fields import VersatileImageField
from django.utils.translation import gettext_lazy as _

class Products(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)    
    ProductID = models.BigIntegerField(unique=True)    
    ProductCode = models.CharField(max_length=255, unique=True)
    ProductName = models.CharField(max_length=255)    
    ProductImage = VersatileImageField(upload_to="images", blank=True, null=True)    
    CreatedDate = models.DateTimeField(auto_now_add=True)
    UpdatedDate = models.DateTimeField(blank=True, null=True)
    CreatedUser = models.ForeignKey(User, related_name="user%(class)s_objects", on_delete=models.CASCADE)    
    IsFavourite = models.BooleanField(default=False)
    Active = models.BooleanField(default=True)    
    HSNCode = models.CharField(max_length=255, blank=True, null=True)    
    TotalStock = models.DecimalField(default=0.00, max_digits=20, decimal_places=8, blank=True, null=True)
  
    class Meta:
        db_table = "products_product"
        verbose_name = _("product")
        verbose_name_plural = _("products")
        unique_together = (("ProductCode", "ProductID"),)
        ordering = ("-CreatedDate", "ProductID")
    
    def update_stock(self):
        from .models import Stock

        totalStock = sum(stock.quantity for stock in Stock.objects.filter(product=self))
        self.TotalStock = totalStock
        self.save()

    def __str__(self):
        return self.ProductName

class Variants(models.Model):
    product = models.ForeignKey(Products, related_name='variants', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} ({self.product.ProductName})"

class SubVariant(models.Model):
    variant = models.ForeignKey(Variants, related_name='subvariants', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} ({self.variant.product.ProductName})"

class Stock(models.Model):
    product = models.ForeignKey(Products, related_name='stock', on_delete=models.CASCADE)
    variant = models.ForeignKey(Variants, related_name='variant_stock', on_delete=models.CASCADE)
    subvariant = models.ForeignKey(SubVariant, related_name='subvariant_stock', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.product.ProductName} - {self.variant.name} - {self.subvariant.name}"
