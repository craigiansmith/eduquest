from django.db import models


class Subject(models.Model):
    name = models.CharField('subject name', max_length=128)

    def __str__(self):
        return self.name


class Choice(models.Model):
    text = models.CharField('a possible answer', max_length=256)

    def __str__(self):
        return self.text


# Questions
# It might be desirable to allow short answers as well. This can be done later.
# A question might have optional media, too.
# I want some way to track which questions a learner has answered and which they have
# answered correctly.
# I also want to provide an aggregate of the ratio of correct to incorrect answers for 
# each question for a class, a group, or several classes.
class Question(models.Model):
    text = models.CharField('a question', max_length=512)
    choices = models.ManyToManyField(Choice, through='QuestionsAndAnswers', verbose_name='possible answer')
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.text


class QuestionsAndAnswers(models.Model):
    questions = models.ForeignKey(Question, on_delete=models.CASCADE)
    choices = models.ForeignKey(Choice, on_delete=models.CASCADE)
    correct = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.questions}? {self.choices}--is--{self.correct}'


    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['questions', 'choices'], name='question_and_possible_answer')
        ]
