#pragma once

#ifndef SETTINGS
#define SETTINGS

class Settings{
  public:
    Settings(
      float _repulsion, 
      float _epsilon, 
      float _inner_distance, 
      float _attraction, 
      float _friction, 
      float _gravity,
      float _time_dilation);

    float get_repulsion() const;
    void set_repulsion(float val);

    float get_epsilon() const;
    void set_epsilon(float val);

    float get_inner_distance() const;
    void set_inner_distance(float val);

    float get_attraction() const;
    void set_attraction(float val);

    float get_friction() const;
    void set_friction(float val);

    float get_gravity() const;
    void set_gravity(float val);

    float get_time_dilation() const;
    void set_time_dilation(float val);

    float repulsion;
    float epsilon;
    float inner_distance;
    float attraction;
    float friction;
    float gravity;
    float time_dilation;
};

#endif