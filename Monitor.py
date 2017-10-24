#coding=utf8
import psutil
import datetime
import time
import os

cpu = {'percent' : 0}
mem = {'percent' : 0}


#get cpu info
def get_cpu_info():
	cpu['percent'] = psutil.cpu_percent(interval=2)

#get men info
def get_mem_info():
	mem_info = psutil.virtual_memory()
	mem['percent'] = mem_info.percent

def run_work():
        f = open('record.txt','a')
        f.write("当前时间：%s\n" % (datetime.datetime.now()))        
        get_cpu_info()
        get_mem_info()      
        f.write("CPU使用率: %s %%\n" % (cpu['percent']))
        f.write("内存使用率: %s %%\n" % (mem['percent'])) 

if __name__ == '__main__':
    start_time = datetime.datetime.now()
    i = 0
    while i < 10 :
        run_work()     
        i = i+1
        time.sleep(3)