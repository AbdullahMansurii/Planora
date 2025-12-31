import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for authentication
export const authHelpers = {
    async signUp(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        return { data, error };
    },

    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        return { user, error };
    },

    async getSession() {
        const { data: { session }, error } = await supabase.auth.getSession();
        return { session, error };
    },
};

// Helper functions for database operations
export const dbHelpers = {
    async savePlan(userId: string, ideaDescription: string, generatedData: any) {
        const { data, error } = await supabase
            .from('plans')
            .insert({
                user_id: userId,
                idea_description: ideaDescription,
                generated_data: generatedData,
            })
            .select()
            .single();
        return { data, error };
    },

    async getUserPlans(userId: string) {
        const { data, error } = await supabase
            .from('plans')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    async getPlanById(planId: string, userId: string) {
        const { data, error } = await supabase
            .from('plans')
            .select('*')
            .eq('id', planId)
            .eq('user_id', userId)
            .single();
        return { data, error };
    },

    async deletePlan(planId: string, userId: string) {
        const { error } = await supabase
            .from('plans')
            .delete()
            .eq('id', planId)
            .eq('user_id', userId);
        return { error };
    },
};
