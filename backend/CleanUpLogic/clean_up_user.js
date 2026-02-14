import cron from 'node-cron';
import { User } from '../modals/user_model';


cron.schedule('0 * * * *', async () => {
  try {
    const result = await User.deleteMany({
      isVerified: false,
      expiresAt: { $lt: new Date() }
    });
    console.log(`[CRON] Deleted ${result.deletedCount} expired unverified accounts`);
  } catch (err) {
    console.error("[CRON] Error cleaning accounts:", err);
  }
});


