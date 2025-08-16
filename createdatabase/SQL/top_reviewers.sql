########################
# This stored procedure returns the top reviewers in teh DB and their average review score
#IDEA: we could modify this to do it by beer style
#NOTE I had to make a perf fix to use the squbq first to filter before the average. 
########################

drop procedure if exists top_reviewers;
delimiter $$
create procedure top_reviewers(IN offsetAmt int)
begin
select reviews.username, count(*) 'Count', avg(reviews.overall_score) 'overall_score', avg(reviews.palette_score) 'palette_score', avg(reviews.aroma_score) 'aroma_score', avg(reviews.appearance_score) 'appearance_score', avg(reviews.taste_score) 'taste_score'

from (select username
		from reviews
		group by username
		order by count(*) desc
		limit 12 offset offsetAmt) subq
	join reviews 
      on reviews.username = subq.username
group by reviews.username;
end $$
delimiter ;