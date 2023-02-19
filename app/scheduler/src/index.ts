import { task } from '@services/scheduler/index';
import { ToadScheduler, SimpleIntervalJob } from 'toad-scheduler';

const job = new SimpleIntervalJob({ hours: 30, runImmediately: true }, task);

const scheduler = new ToadScheduler();

scheduler.addSimpleIntervalJob(job);
