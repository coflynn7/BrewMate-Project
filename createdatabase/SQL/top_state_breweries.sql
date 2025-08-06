set @brewery_state = 'wisconsin';

select max(brewery.Name), avg(overall_score), avg(palette_score),avg(aroma_score), avg(taste_score)
from brewery
	inner join beer
      on brewery.brewery_id = beer.brewery_id
	inner join reviews
      on beer.beer_id = reviews.beer_id
where brewery.state = @brewery_state
GROUP BY brewery.brewery_id

#we don't need this unless we want all the highest values. 
having avg(overall_score) >= (select max(score)
								from (select avg(overall_score) as score
										from reviews
                                        group by beer_id) as t
							  )
ORDER BY avg(overall_score) DESC
Limit 100;