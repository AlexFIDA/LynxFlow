from django.http import HttpResponse
from django.shortcuts import render
from django.urls import reverse


def home(request):
    return render(
        request,
        "core/home.html",
        {
            "page_title": "Внедрение CRM и автоматизация бизнес-процессов",
            "meta_description": (
                "Внедрение CRM, интеграции и автоматизация "
                "бизнес-процессов в Алматы и Казахстане."
            ),
        },
    )


def robots_txt(request):
    sitemap_url = request.build_absolute_uri(reverse("sitemap"))

    content = (
        "User-agent: *\n"
        "Allow: /\n"
        f"Sitemap: {sitemap_url}\n"
    )

    return HttpResponse(content, content_type="text/plain; charset=utf-8")


def sitemap_xml(request):
    routes = [
        request.build_absolute_uri(reverse("main:home")),
        request.build_absolute_uri(reverse("cases:list")),
    ]

    return render(
        request,
        "sitemap.xml",
        {"routes": routes},
        content_type="application/xml",
    )