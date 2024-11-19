from .models import Products, Variants, Stock, SubVariant
from rest_framework import serializers

class StockSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Stock
        fields = ['quantity']

class SubVariantSerializer(serializers.ModelSerializer):
    stock = StockSerializer(source='subvariant_stock.all', many=True)
    class Meta:
        model = SubVariant
        fields = ['id', 'name', 'stock']

class VariantSerializer(serializers.ModelSerializer):
    subvariants = SubVariantSerializer(many=True, required=True)

    class Meta:
        model = Variants
        fields = ['id', 'name', 'subvariants']

    def create(self, validated_data):
        subvariant_data = validated_data.pop('subvariants')
        product = validated_data.pop('product')
        variant = Variants.objects.create(product=product, **validated_data)
        for subvariant in subvariant_data:
            stock = subvariant.pop('stock',1)
            subvariant_obj = SubVariant.objects.create(variant=variant, **subvariant)
            Stock.objects.create(product=product, variant=variant, subvariant=subvariant_obj, quantity=stock)
        return variant

class ProductSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True, required=True)

    class Meta:
        model = Products
        fields = [
            'id',
            'ProductID',
            'ProductCode',
            'ProductName',
            'ProductImage',
            'IsFavourite',
            'HSNCode',
            'TotalStock',
            'variants'
        ]

    def create(self, validated_data):
        variant_data = validated_data.pop('variants')
        user = self.context['user']
        product = Products.objects.create(CreatedUser=user, **validated_data)
        for variant in variant_data:
            variant['product'] = product
            VariantSerializer().create(variant)
        product.update_stock()
        return product


class StockSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Stock
        fields = '__all__'
