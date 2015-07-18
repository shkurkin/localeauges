class MatchMailer < ApplicationMailer
  def new_match(match)
    @match = match
    title = 'New Match - '
    @match.teams.order(:name).each_with_index do |team, i|
      title += team.name
      title += ' VS ' if i != @match.teams.size - 1
    end
    emails = @match.users.collect(&:email).join ','
    @location = Location.find(@match.location_id)
    mail( :to => emails, :subject => title )
  end
end
