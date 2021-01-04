from django.shortcuts import render, redirect
from django.http.response import HttpResponseRedirect

def index(request):
    """
    Render react app
    """
    return render(request, 'frontend/index.html')

def redirect_assets(request, subpath):
    """
    Redirect /assets/ requests, to /static/frontend/assets/
    """
    #response = redirect("/static/frontend/assets/")
    return HttpResponseRedirect("/static/frontend/assets/%s" % subpath)
