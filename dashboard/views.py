from django.shortcuts import render


def dashboard(request):
    """Main repository view — item data is currently rendered client-side
    from static/dashboard/script.js. Once real repository data is
    available server-side, pass it into the context here and read it
    from the template instead of the hardcoded JS array."""
    return render(request, "dashboard/dashboard.html")
