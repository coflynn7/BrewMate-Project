
select username, count(*)
from reviews
group by username
order by count(*) desc
limit 10