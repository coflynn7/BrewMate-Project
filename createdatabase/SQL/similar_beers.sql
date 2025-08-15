########################
# This stored procedure returns similar beers to the input beer
#
########################

drop procedure if exists similar_beers;
delimiter $$
create procedure similar_beers(IN beerid bigint)
begin
select b2.*
from beer b1
join beer b2
    ON b1.style = b2.style
    AND b1.beer_id <> b2.beer_id
    AND b2.abv BETWEEN b1.abv - 0.2 AND b1.abv + 0.2
where b1.beer_id = beerid;
end $$
delimiter ;
