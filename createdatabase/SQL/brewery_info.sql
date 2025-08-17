########################
# This stored procedure returns information about a beer
#
########################
drop procedure if exists brewery_info;
delimiter $$
create procedure brewery_info(IN brewery bigint)
begin
select *
from brewery
where brewery.brewery_id = brewery;
end $$
delimiter ;
