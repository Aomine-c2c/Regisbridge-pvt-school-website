import React, { useState } from 'react';
import { Trophy, Users, Calendar, MapPin, Clock, Star, Award, Target } from 'lucide-react';

export default function SportsHub() {
  const [activeTab, setActiveTab] = useState('teams');
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const sports = [
    {
      id: 'football',
      name: 'Football',
      icon: '⚽',
      teams: [
        { name: 'Senior Boys', coach: 'Mr. Ndlovu', players: 22, achievements: 'Regional Champions 2024' },
        { name: 'Junior Boys', coach: 'Mr. Moyo', players: 18, achievements: 'District Winners 2024' },
        { name: 'Girls Team', coach: 'Ms. Sibanda', players: 16, achievements: 'Inter-School Cup 2024' },
      ],
      schedule: [
        { date: '2025-01-25', opponent: 'Harare International', time: '14:00', venue: 'Home' },
        { date: '2025-02-01', opponent: 'St. Johns College', time: '15:30', venue: 'Away' },
      ]
    },
    {
      id: 'basketball',
      name: 'Basketball',
      icon: '🏀',
      teams: [
        { name: 'Varsity Team', coach: 'Mr. Thompson', players: 12, achievements: 'National Qualifiers 2024' },
        { name: 'Development Squad', coach: 'Ms. Patel', players: 15, achievements: 'City League 3rd Place' },
      ],
      schedule: [
        { date: '2025-01-28', opponent: 'Basketball Academy', time: '16:00', venue: 'Home' },
      ]
    },
    {
      id: 'tennis',
      name: 'Tennis',
      icon: '🎾',
      teams: [
        { name: 'Competitive Team', coach: 'Mrs. Johnson', players: 8, achievements: 'Provincial Champions' },
        { name: 'Recreational', coach: 'Mr. Brown', players: 12, achievements: 'Club Tournament Winners' },
      ],
      schedule: [
        { date: '2025-01-30', opponent: 'Tennis Club Harare', time: '09:00', venue: 'Away' },
      ]
    },
    {
      id: 'swimming',
      name: 'Swimming',
      icon: '🏊',
      teams: [
        { name: 'Competitive Squad', coach: 'Ms. Davis', players: 14, achievements: 'National Records Holder' },
        { name: 'Development', coach: 'Mr. Wilson', players: 20, achievements: 'Regional Qualifiers' },
      ],
      schedule: [
        { date: '2025-02-05', opponent: 'Aquatic Center', time: '07:00', venue: 'Home' },
      ]
    },
  ];

  const activities = [
    { name: 'Chess Club', members: 24, coordinator: 'Mr. Nkosi', meeting: 'Wednesdays 15:00' },
    { name: 'Debate Society', members: 18, coordinator: 'Mrs. Moyo', meeting: 'Thursdays 16:00' },
    { name: 'Drama Club', members: 22, coordinator: 'Ms. Rodriguez', meeting: 'Fridays 14:30' },
    { name: 'Science Club', members: 30, coordinator: 'Mr. Patel', meeting: 'Tuesdays 15:30' },
    { name: 'Art Club', members: 28, coordinator: 'Mrs. Sibanda', meeting: 'Mondays 14:00' },
    { name: 'Music Club', members: 20, coordinator: 'Mr. Brown', meeting: 'Wednesdays 16:00' },
  ];

  const achievements = [
    { sport: 'Football', achievement: 'Regional Champions 2024', date: '2024-11-15', icon: '🏆' },
    { sport: 'Swimming', achievement: 'National Records Broken', date: '2024-10-20', icon: '🏊' },
    { sport: 'Tennis', achievement: 'Provincial Champions', date: '2024-09-10', icon: '🎾' },
    { sport: 'Basketball', achievement: 'City League Winners', date: '2024-08-25', icon: '🏀' },
  ];

  const renderTeams = () => (
    <div className="space-y-8">
      {sports.map((sport) => (
        <div key={sport.id} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">{sport.icon}</span>
            <h3 className="text-2xl font-bold text-[#1C1A75]">{sport.name}</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {sport.teams.map((team, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-[#1C1A75] mb-2">{team.name}</h4>
                <p className="text-sm text-gray-600 mb-1">Coach: {team.coach}</p>
                <p className="text-sm text-gray-600 mb-2">Players: {team.players}</p>
                <p className="text-xs text-green-600 font-medium">{team.achievements}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-[#1C1A75] mb-3 flex items-center">
              <Calendar size={18} className="mr-2" />
              Upcoming Matches
            </h4>
            <div className="space-y-2">
              {sport.schedule.map((match, index) => (
                <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar size={16} className="text-blue-600" />
                    <div>
                      <p className="font-medium text-[#1C1A75]">vs {match.opponent}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(match.date).toLocaleDateString()} at {match.time}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    match.venue === 'Home' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {match.venue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderActivities = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#1C1A75]">{activity.name}</h3>
            <Users size={24} className="text-[#D4AF37]" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Coordinator:</span> {activity.coordinator}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Members:</span> {activity.members}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Meeting:</span> {activity.meeting}
            </p>
          </div>
          <button className="mt-4 w-full bg-[#1C1A75] text-white py-2 px-4 rounded-lg hover:bg-[#D4AF37] transition-colors">
            Join Club
          </button>
        </div>
      ))}
    </div>
  );

  const renderAchievements = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {achievements.map((achievement, index) => (
        <div key={index} className="bg-gradient-to-r from-[#1C1A75] to-[#D4AF37] text-white p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{achievement.icon}</span>
            <Award size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">{achievement.sport}</h3>
          <p className="text-white/90 mb-2">{achievement.achievement}</p>
          <p className="text-sm text-white/75">
            {new Date(achievement.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <section id="sports" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-[#1C1A75] mb-4">
            Sports & Activities Hub
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive sports programs and extracurricular activities designed to develop well-rounded students.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-1">
            <div className="flex space-x-1">
              {[
                { id: 'teams', label: 'Sports Teams', icon: Trophy },
                { id: 'activities', label: 'Clubs & Activities', icon: Users },
                { id: 'achievements', label: 'Achievements', icon: Star },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#1C1A75] text-white shadow-lg'
                      : 'text-gray-600 hover:text-[#1C1A75] hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'teams' && renderTeams()}
          {activeTab === 'activities' && renderActivities()}
          {activeTab === 'achievements' && renderAchievements()}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <Target size={48} className="text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#1C1A75] mb-4">Join Our Teams</h3>
            <p className="text-gray-600 mb-6">
              Interested in joining a sports team or club? Contact our physical education department to learn about tryouts and registration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#1C1A75] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#D4AF37] transition-colors">
                Contact Sports Department
              </button>
              <button className="border-2 border-[#1C1A75] text-[#1C1A75] px-6 py-3 rounded-lg font-semibold hover:bg-[#1C1A75] hover:text-white transition-colors">
                View Facilities
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}