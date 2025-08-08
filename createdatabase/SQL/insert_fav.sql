########################
# This stored procedure inserts a users favorite beer into the database
#NOTE I should update this to validate params before storing
########################
drop procedure if exists insert_fav;
delimiter $$
create procedure insert_fav(IN beerid bigint, IN username varchar(25))
begin
insert into favoritebeers ( beer_id, username )
values (beerid ,username);
end $$
delimiter ;