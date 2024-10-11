package com.cse416.server;

public class VotePercentageResponse {

    private double republicanPercentage;
    private double democratPercentage;

    public VotePercentageResponse(double republicanPercentage, double democratPercentage) {
        this.republicanPercentage = republicanPercentage;
        this.democratPercentage = democratPercentage;
    }

    // Getters and setters
    public double getRepublicanPercentage() {
        return republicanPercentage;
    }

    public void setRepublicanPercentage(double republicanPercentage) {
        this.republicanPercentage = republicanPercentage;
    }

    public double getDemocratPercentage() {
        return democratPercentage;
    }

    public void setDemocratPercentage(double democratPercentage) {
        this.democratPercentage = democratPercentage;
    }
}
