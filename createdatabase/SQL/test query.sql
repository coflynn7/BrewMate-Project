select *
from (
	select 	reviews.beer_id as beer_id,
			avg(overall_score) as score
	FROM reviews
	group by reviews.beer_id) as scoreGroup
LEFT JOIN beer
  on scoreGroup.beer_id = beer.beer_id
LEFT OUTER JOIN brewery
  on beer.brewery_id = brewery.brewery_id
WHERE scoreGroup.score >= ( select max(score)
							from (select avg(overall_score) score
									from reviews
									group by beer_id) sub) 
					
	AND state='Wisconsin'
    -- AND scoreGroup.score >= 5

