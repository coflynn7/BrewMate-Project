set @username = 'northyorksammy';

DROP TABLE IF EXISTS temp_reviews;
CREATE TEMPORARY TABLE temp_reviews
(
beer_id bigint,
avgScore int
);

INSERT into temp_reviews
select beer_id, avg(reviews.overall_score)
from reviews
where reviews.username = @username
group by beer_id;

select t1.beer_id, avgScore, avgnon, avgScore - avgnon as 'diff'
FROM temp_reviews t1
  LEFT OUTER JOIN (
					select reviews.beer_id, avg(reviews.overall_score) 'avgnon'
						from reviews
						where reviews.username <> @username
						group by reviews.beer_id) subq
		on t1.beer_id = subq.beer_id
ORDER BY diff desc;