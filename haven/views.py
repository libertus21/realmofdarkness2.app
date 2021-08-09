from django.shortcuts import render
from .forms.vampire20th import Vampire20thSheet

def haven(request):
    return render(request, 'haven/haven.html')

def new(request):
    return render(request, 'haven/new.html')

def new_vampire20th(request):
    form = Vampire20thSheet()
    return render(request, 'haven/vampire20th.html', context={'form': form})