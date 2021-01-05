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

#from django.shortcuts import render
from django.http.response import HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Tweet
from .serializers import TweetSerializer

@api_view(['GET'])
def get_tweets(request):
    """
    :param limit: maximum amount of records
    :param offset: start index in the search
    :param orderBy: sort by field
      - date
      - username
    """
    # Get parameters
    limit = request.GET.get('limit', None)
    offset = request.GET.get('offset', None)
    order_by = request.GET.get('orderBy', None)
    # Verify sort by
    if order_by:
        if not order_by in ('date', 'username'):
            # Bad request
            return HttpResponseBadRequest("orderBy value is not valid")
    # Get tweets
    tweets = Tweet.objects.all()
    # If sort by, sort
    if order_by:
        tweets = tweets.order_by(order_by)
    # If offset, remove first object
    if offset:
        try:
            offset = int(offset)
        except ValueError:
            # Bad request
            return HttpResponseBadRequest("offset is NaN")
        tweets = tweets[offset:]
    # If limit, limit
    if limit:
        try:
            limit = int(limit)
        except ValueError:
            # Bad request
            return HttpResponseBadRequest("limit is NaN")
        tweets = tweets[:limit]
    # Return tweets
    serializer = TweetSerializer(tweets, many=True)
    return Response(serializer.data)
