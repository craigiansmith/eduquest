import json

from django.shortcuts import render
from django.views.generic import TemplateView

from .models import Question

class GameView(TemplateView):
    template_name = 'quizshow/game.html'

    def get_context_data(self, **kwargs):
        questions = Question.objects.all().order_by('?')[:8]
        for q in questions:
            q.answers = q.choices.all()
            for a in q.answers:
                a.correct = a.questionsandanswers_set.get(choices=a,  questions=q).correct

        output = []
        for q in questions:
            question = {
                'text': q.text,
                'answers': []}
            for a in q.answers:
                answer = {
                    'text': a.text,
                    'correct': a.correct
                }
                question['answers'].append(answer)
            output.append(question)

        return {
            'questions': output
        }
