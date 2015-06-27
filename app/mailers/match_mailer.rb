class MatchMailer < ApplicationMailer
  def new_match(match)
    @match = match
    title = 'New Match - '
    @non_player_team = false
    @match.teams.order(:name).each_with_index do |team, i|
      @non_player_team = true if !team.player_team
      title += team.name
      title += ' VS ' if i != @match.teams.size - 1
    end
    emails = @match.users.collect(&:email).join ','
    @location = Location.find(@match.location_id)
    mail( :to => emails, :subject => title )
  end
end
