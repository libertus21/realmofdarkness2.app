from django.shortcuts import render, redirect


def index(request):
    if request.user.is_authenticated:
        return redirect('haven:haven')
    return render(request, 'layout.html')

def about(request):
    return render(request, 'layout.html')