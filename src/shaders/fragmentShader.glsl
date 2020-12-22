uniform vec2 u_mouse;
uniform vec2 u_resolution;

float circle(in vec2 _st, in float _radius, in float blurriness){
    vec2 dist = _st;
    return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
}

void main() {
    // We manage the device ratio by passing PR constant
    vec2 res = u_resolution * PR;
    vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
    // tip: use the following formula to keep the good ratio of your coordinates
    st.y *= u_resolution.y / u_resolution.x;

    // We readjust the mouse coordinates
    vec2 mouse = u_mouse * -0.5;

    vec2 circlePos = st + mouse;
    float c = circle(circlePos, .03, 2.);

    gl_FragColor = vec4(vec3(c), 1.);
}
