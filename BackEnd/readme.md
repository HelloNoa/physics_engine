    sudo -i -u postgres

    sudo -u postgres psql
# postsql 설정파입
    sudo vim /etc/postgresql/13/main/postgresql.conf
# postsql 재시작
    sudo /etc/init.d/postgresql restart
# postsql 비밀번호 변경
    alter user postgres with password ''
# postsql 유저 생성
    CREATE USER "USER_NAME" PASSWORD 'PASSWORD' SUPERUSER;
# 방화벽
    iptables -I INPUT 1 -p tcp --dport 5051 -j ACCEPT
    iptables -I INPUT 1 -p udp --dport 5051 -j ACCEPT
    service iptables save
# pm2
    pm2 start server.js --watch

# postSQL
    sudo apt-get install postgresql postgresql-contrib