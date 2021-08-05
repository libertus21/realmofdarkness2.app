from django.shortcuts import render


def index(request):
    render(request, 'layout.html')

def about(request):
    pass