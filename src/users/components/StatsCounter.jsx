import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import WOW from "wowjs";
import "bootstrap-icons/font/bootstrap-icons.css";

const StatsCounter = () => {
    const [count, setCount] = useState({
        today: 0,
        monthly: 0,
        yearly: 0,
        total: 0,
    });

    const finalValues = {
        today: 125,
        monthly: 3200,
        yearly: 24000,
        total: 56000,
    };

    const duration = 16000;
    const fps = 60;
    const intervalTime = duration / fps;

    useEffect(() => {
        new WOW.WOW().init();

        const steps = duration / intervalTime;

        const interval = setInterval(() => {
            setCount((prev) => {
                const updated = {};
                let done = true;

                Object.keys(prev).forEach((key) => {
                    const increment = finalValues[key] / steps;
                    if (prev[key] < finalValues[key]) {
                        updated[key] = Math.min(prev[key] + increment, finalValues[key]);
                        done = false;
                    } else {
                        updated[key] = finalValues[key];
                    }
                });

                if (done) clearInterval(interval);
                return updated;
            });
        }, intervalTime);
    }, []);

    return (
        <section className="banner-container pt-2">
            <div className="container my-5">
                <div className="row text-center">

                  <div className="col-6 col-md-3 mb-4 wow fadeInUp" data-wow-delay="0.1s">
    <div className="icon-circle">
        <i className="bi bi-briefcase-fill fs-1"></i>
    </div>
    <h2 className="fw-bold text-white">{Math.floor(count.today)}+</h2>
    <p className="text-white">Today's Jobs</p>
</div>

<div className="col-6 col-md-3 mb-4 wow fadeInUp" data-wow-delay="0.2s">
    <div className="icon-circle">
        <i className="bi bi-calendar-fill fs-1"></i>
    </div>
    <h2 className="fw-bold text-white">{Math.floor(count.monthly)}+</h2>
    <p className="text-white">Monthly Jobs</p>
</div>

<div className="col-6 col-md-3 mb-4 wow fadeInUp" data-wow-delay="0.3s">
    <div className="icon-circle">
        <i className="bi bi-bar-chart-line-fill fs-1"></i>
    </div>
    <h2 className="fw-bold text-white">{Math.floor(count.yearly)}+</h2>
    <p className="text-white">Yearly Jobs</p>
</div>

<div className="col-6 col-md-3 mb-4 wow fadeInUp" data-wow-delay="0.4s">
    <div className="icon-circle">
        <i className="bi bi-graph-up-arrow fs-1"></i>
    </div>
    <h2 className="fw-bold text-white">{Math.floor(count.total)}+</h2>
    <p className="text-white">Total Jobs</p>
</div>


                </div>
            </div>

           
        </section>
    );
};

export default StatsCounter;
