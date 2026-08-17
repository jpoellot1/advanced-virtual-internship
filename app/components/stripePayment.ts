import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

export async function createCheckoutSession(userId: string, priceId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            const checkoutRef = collection(db, 'users', userId, 'checkout_sessions');

            const docRef = await addDoc(checkoutRef, {
                price: priceId,
                success_url: `${window.location.origin}/for-you?success=true`,
                cancel_url: `${window.location.origin}/choose-plan?canceled=true`,
            });
            const unsubscribe = onSnapshot(docRef, (snap) => {
                const data = snap.data();
                if (data?.error) {
                    unsubscribe();
                    reject(new Error(data.error.message))
                }
                if (data?.url) {
                    unsubscribe()
                    window.location.assign(data.url);
                    resolve()
                }
            })
        } catch(err) {
            reject(err)
        }
    })
}