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

from django.contrib import admin

from .models import Category, Ingredient, Recipe, RecipeImage, RecipeIngredient, Tweet

class RecipeImageInline(admin.StackedInline):
    model = RecipeImage
    extra = 2

class RecipeIngredientInline(admin.StackedInline):
    model = RecipeIngredient
    extra = 6

class RecipeForm(admin.ModelAdmin):
    fieldsets = [
        ('name information', {'fields': ['title_it', 'title_en']}),
        ('Date information', {'fields': ['date']}),
        ('Categories', {'fields': ['categories']}),
        ('Preparation', {'fields': ['body_it', 'body_en', 'persons']}),
    ]
    inlines = [RecipeImageInline, RecipeIngredientInline]

# Register entities
admin.site.register(Category)
admin.site.register(Ingredient)
admin.site.register(Recipe, RecipeForm)
admin.site.register(Tweet)
