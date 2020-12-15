from django.contrib import admin

from .models import Subject, Question, Choice, QuestionsAndAnswers


class ChoiceAdmin(admin.ModelAdmin):
    model = Choice
    list_display = ('text',)

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3
    fields = ['text']


class QuestionsAndAnswersInline(admin.TabularInline):
    model = QuestionsAndAnswers
    inlines = [ChoiceInline]
    verbose_name = 'possible answer'


class QuestionAdmin(admin.ModelAdmin):
    fields = ['text', 'subject']
    inlines = [QuestionsAndAnswersInline]
    list_display = ('text', 'subject')

#    def get_form(self, request, obj=None, change=False, **kwargs):
#        form = super().get_form(request, obj, change, **kwargs)
#        form.base_fields['QuestionsAndAnswers'].label = 'Possible answers'


class QuestionInline(admin.TabularInline):
    model = Question
    fields = ['text']
    extra = 0

class SubjectAdmin(admin.ModelAdmin):
    model = Subject
    inlines = [QuestionInline]

admin.site.register(Question, QuestionAdmin)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(Choice, ChoiceAdmin)
