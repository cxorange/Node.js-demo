pg启动命令 ：pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
连接:psql -U 用户名 -P 密码 -d postgres -h 127.0.0.1

CREATE TABLE Production_Sim(
mid_T_balance varchar(80),
high_T_balance varchar(80),
low_P_balance varchar(80),
mid_P_balance varchar(80),
high_P_balance varchar(80),
HMT varchar(80),
upper_GPI varchar(80),
mid_GPI varchar(80),
low_GPI varchar(80),
blast_volume varchar(80),
o2_enrich_flow varchar(80),
blast_humidity varchar(80),
PC_injection varchar(80),
ore_charging varchar(80),
coke_charging varchar(80),
id integer);