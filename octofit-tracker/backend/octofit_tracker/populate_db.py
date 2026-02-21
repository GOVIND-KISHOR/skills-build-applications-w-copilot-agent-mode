from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Workout, Leaderboard

class UserTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')

    def test_user_creation(self):
        self.assertEqual(User.objects.count(), 1)

class TeamTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.team = Team.objects.create(name='Test Team')
        self.team.members.add(self.user)

    def test_team_creation(self):
        self.assertEqual(Team.objects.count(), 1)

class ActivityTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.activity = Activity.objects.create(user=self.user, activity_type='run', duration=30, calories_burned=200, date='2024-01-01')

    def test_activity_creation(self):
        self.assertEqual(Activity.objects.count(), 1)

class WorkoutTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.workout = Workout.objects.create(user=self.user, name='Morning Workout', description='Pushups', date='2024-01-01')

    def test_workout_creation(self):
        self.assertEqual(Workout.objects.count(), 1)

class LeaderboardTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.team = Team.objects.create(name='Test Team')
        self.leaderboard = Leaderboard.objects.create(team=self.team, total_points=100)

    def test_leaderboard_creation(self):
        self.assertEqual(Leaderboard.objects.count(), 1)
