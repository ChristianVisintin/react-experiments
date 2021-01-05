# This is free and unencumbered software released into the public domain.
# 
# Anyone is free to copy, modify, publish, use, compile, sell, or
# distribute this software, either in source code form or as a compiled
# binary, for any purpose, commercial or non-commercial, and by any
# means.
# 
# In jurisdictions that recognize copyright laws, the author or authors
# of this software dedicate any and all copyright interest in the
# software to the public domain. We make this dedication for the benefit
# of the public at large and to the detriment of our heirs and
# successors. We intend this dedication to be an overt act of
# relinquishment in perpetuity of all present and future rights to this
# software under copyright law.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
# IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
# OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
# ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
# OTHER DEALINGS IN THE SOFTWARE.
# 
# For more information, please refer to <http://unlicense.org>
#

from rest_framework import serializers
from rest_framework.relations import SlugRelatedField, StringRelatedField
from .models import Recipe, Category, Ingredient, RecipeIngredient, Tweet

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ('id', 'username', 'nickname', 'date', 'text', 'url', 'avatar')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name_it', 'name_en')

class IngredientNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('name_it', 'name_en')

class RecipeIngredientSerializer(serializers.ModelSerializer):
    """
    Serialize recipe ingredients
    """
    #ingredient_name_it = SlugRelatedField(slug_field='ingredient_to_recipe.name_it', read_only=True)
    name_it = serializers.CharField(source='ingredient.name_it')
    name_en = serializers.CharField(source='ingredient.name_en')
    class Meta:
        model = RecipeIngredient
        fields = ('name_it', 'name_en', 'quantity', 'measure')

# Recipe serializers

class PartialRecipeSerializer(serializers.ModelSerializer):
    """
    Partial recipe serializer
    """
    images = StringRelatedField(many=True)
    class Meta:
        model = Recipe
        fields = ('id', 'title_it', 'title_en', 'categories', 'date', 'images')

class DetailedRecipeSerializer(serializers.ModelSerializer):
    """
    Full recipe serializer
    """
    images = StringRelatedField(many=True)
    recipeIngredients = RecipeIngredientSerializer(many=True)
    class Meta:
        model = Recipe
        fields = ('id', 'title_en', 'title_it', 'categories', 'date', 'images', 'recipeIngredients', 'body_en', 'body_it', 'likes', 'persons')
