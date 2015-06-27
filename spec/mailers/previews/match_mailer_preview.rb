# Preview all emails at http://localhost:3000/rails/mailers/match_mailer
class MatchMailerPreview < ActionMailer::Preview
  def new_match
    MatchMailer.new_match(Match.last)
  end
end
