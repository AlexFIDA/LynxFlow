from django.shortcuts import render


def case_list(request):
    return render(
        request,
        "cases/list.html",
        {
            "page_title": "Кейсы",
            "meta_description": (
                "Кейсы по внедрению CRM, интеграциям "
                "и автоматизации бизнес-процессов."
            ),
        },
    )