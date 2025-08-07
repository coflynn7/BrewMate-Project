########################
# This stored procedure returns the avg score of users reviews compared to everyone elses
#
########################

drop procedure if exists user_review_diff;
delimiter $$
create procedure user_review_diff(IN usernameIn varchar(25))
begin

DROP TABLE IF EXISTS temp_reviews;
CREATE TEMPORARY TABLE temp_reviews
(
beer_id bigint,
myScore int
);

INSERT into temp_reviews
select beer_id, avg(reviews.overall_score)
from reviews
where reviews.username = usernameIn
group by beer_id;

select t1.beer_id, beer.Name, myScore, otherScore, myScore - otherScore as 'diff'
FROM temp_reviews t1
  LEFT OUTER JOIN (
					select reviews.beer_id, avg(reviews.overall_score) 'otherScore'
						from reviews
						where reviews.username <> usernameIn
						group by reviews.beer_id) subq
		on t1.beer_id = subq.beer_id
	LEFT OUTER JOIN beer
      on t1.beer_id = beer.beer_id
ORDER BY diff desc;
end $$
delimiter ;