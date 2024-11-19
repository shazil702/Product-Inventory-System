import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated

class ProductsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            products = Products.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self, request):
        try:
            user = request.user
            data = request.data.copy()
            if 'variants' in data and isinstance(data['variants'], str):
                data['variants'] = json.loads(data['variants'])
            for variant_data in data.get('variants', []):
                product_id = data.get('ProductID')
                product, created = Products.objects.get_or_create(
                    ProductID=product_id,
                    defaults={
                        'CreatedUser': user,
                        'ProductCode': data.get('ProductCode'),
                        'ProductName': data.get('ProductName'),
                        'ProductImage': data.get('ProductImage'),
                        'HSNCode': data.get('HSNCode'),
                    }
                )
                variant, _ = Variants.objects.get_or_create(
                    name=variant_data.get('name'),
                    product=product
                )

                if 'subvariants' in variant_data and isinstance(variant_data['subvariants'], list):
                    for subvariant_data in variant_data['subvariants']:
                        subvariant, _ = SubVariant.objects.get_or_create(
                            name=subvariant_data.get('name'),
                            variant=variant
                        )
                        stock = subvariant_data.get('stock', 1)
                        if isinstance(stock, str):
                            try:
                                stock = json.loads(stock)
                            except json.JSONDecodeError:
                                stock = [int(stock)]
            clean_data = {
                'ProductID': data.get('ProductID'),
                'ProductCode': data.get('ProductCode'),
                'ProductName': data.get('ProductName'),
                'ProductImage': data.get('ProductImage'),
                'variants': data['variants']
            }
            serializer = ProductSerializer(data=clean_data, context={'user': user})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Products.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        try:
            product = Products.objects.get(ProductID=pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Products.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

class UpdateStockView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, subvariant_id):
        try:
            quantity = request.data.get("quantity", 0)
            if quantity is None:
                return Response({"error": "Quantity is required"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                stock = Stock.objects.get(subvariant_id=subvariant_id)
                stock.quantity = quantity
                stock.save()
                return Response({"message": "Stock updated successfully"}, status=status.HTTP_200_OK)
            except Stock.DoesNotExist:
                subvariant = SubVariant.objects.get(id=subvariant_id)
                variant = subvariant.variant
                product = variant.product
                Stock.objects.create(
                    subvariant=subvariant,
                    variant=variant,
                    product=product,
                    quantity=quantity,
                )
                return Response({"message": "Stock created successfully"}, status=status.HTTP_201_CREATED)
        except SubVariant.DoesNotExist:
            return Response({"error": "Subvariant not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RemoveStockView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, subvariant_id):
        try:
           subvariant = SubVariant.objects.get(id=subvariant_id)
           subvariant.delete()
           return Response({"message": "Subvariant deleted successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)