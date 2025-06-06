import Config from './models/config.model.js';

export const setAvailableTime = async (start, end) => {
  let config = await Config.findOne();
  if (!config) {
    config = new Config();
  }
  config.availableTime = { start, end };
  await config.save();
  return config.availableTime;
};

export const setDayOffs = async (offDays) => {
  let config = await Config.findOne();
  if (!config) {
    config = new Config();
  }
  config.offDays = offDays;
  await config.save();
  return config.offDays;
};

export const getConfig = async () => {
  let config = await Config.findOne();

  if (!config) {
    config = await Config.create({
      availableTime: { start: "09:00", end: "17:00" },
      offDays: [],
    });
  }

  if (!config.availableTime || !config.availableTime.start || !config.availableTime.end) {
    config.availableTime = { start: "09:00", end: "17:00" };
  }

  return config;
};