import 'reflect-metadata';
import 'dotenv/config';
import '../../ioc';

import { httpServer } from '@infra/http';
import { schedulerJob } from '@infra/scheduler';
import { DataSourceConfiguration } from '@infra/typeorm/bootstrap';

DataSourceConfiguration.initialize()
  .then(() => {
    console.log('✅ Datasource: ON');
    httpServer.start();
    schedulerJob.start();
  })
  .catch(error => {
    console.log('⛔ Datasource: DOWN');
    console.error(error);
  });
