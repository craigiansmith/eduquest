from django.contrib import admin

from .models import Question, Choice, QuestionsAndAnswers

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3
    fields = ['text']


class QuestionsAndAnswersInline(admin.TabularInline):
    model = QuestionsAndAnswers
    inlines = [ChoiceInline]


class QuestionAdmin(admin.ModelAdmin):
    fields = ['text']
    inlines = [QuestionsAndAnswersInline]

#    def get_form(self, request, obj=None, change=False, **kwargs):
#        form = super().get_form(request, obj, change, **kwargs)
#        form.base_fields['QuestionsAndAnswers'].label = 'Possible answers'

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
