from apscheduler.schedulers.blocking import BlockingScheduler
from datetime import datetime
import time
import os
 
def tick():
    print ('Tick! The time is: %s' % datetime.now())
 
 
#每隔三秒执行一次
if __name__ == '__main__':
    scheduler = BlockingScheduler()
    scheduler.add_job(tick,'cron',second='*/3',hour='*')
    print ('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))
    try:
        scheduler.start()
    except KeyboardInterrupt ,e:
        scheduler.shutdown()