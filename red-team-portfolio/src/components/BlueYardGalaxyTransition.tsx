'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect } from 'react'

export default function BlueYardGalaxyTransition() {
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end']
  })

  // True 3D camera system - the camera moves through space, not overlays
  const cameraX = useMotionValue(0)
  const cameraY = useMotionValue(0)
  const cameraZ = useMotionValue(0)
  const cameraRotateX = useMotionValue(0)
  const cameraRotateY = useMotionValue(0)
  const cameraRotateZ = useMotionValue(0)

  // Smooth camera springs for fluid movement
  const springCameraX = useSpring(cameraX, { stiffness: 100, damping: 30 })
  const springCameraY = useSpring(cameraY, { stiffness: 100, damping: 30 })
  const springCameraZ = useSpring(cameraZ, { stiffness: 100, damping: 30 })
  const springRotateX = useSpring(cameraRotateX, { stiffness: 80, damping: 25 })
  const springRotateY = useSpring(cameraRotateY, { stiffness: 80, damping: 25 })
  const springRotateZ = useSpring(cameraRotateZ, { stiffness: 80, damping: 25 })

  // Galaxy waypoints - the camera travels between these points in 3D space
  const waypoints = [
    { 
      id: 'red-sun', 
      x: 0, y: 0, z: 0, 
      rotateX: 0, rotateY: 0, rotateZ: 0,
      color: '#ff0040', 
      size: 120, 
      name: 'Red Sun',
      scrollTrigger: 0.1
    },
    { 
      id: 'firewall', 
      x: 800, y: -600, z: 400, 
      rotateX: 15, rotateY: -30, rotateZ: 5,
      color: '#4a90e2', 
      size: 80, 
      name: 'Firewall',
      scrollTrigger: 0.2
    },
    { 
      id: 'encryption', 
      x: -700, y: 500, z: -500, 
      rotateX: -20, rotateY: 45, rotateZ: -10,
      color: '#8b3a8b', 
      size: 70, 
      name: 'Encryption',
      scrollTrigger: 0.35
    },
    { 
      id: 'penetration', 
      x: 600, y: 800, z: -300, 
      rotateX: 25, rotateY: -60, rotateZ: 15,
      color: '#ff4d6d', 
      size: 60, 
      name: 'Penetration',
      scrollTrigger: 0.5
    },
    { 
      id: 'defense', 
      x: -800, y: -400, z: 600, 
      rotateX: -15, rotateY: 30, rotateZ: -5,
      color: '#22c55e', 
      size: 65, 
      name: 'Defense',
      scrollTrigger: 0.65
    },
    { 
      id: 'malware', 
      x: 500, y: -800, z: -600, 
      rotateX: 30, rotateY: -45, rotateZ: 20,
      color: '#6b7280', 
      size: 55, 
      name: 'Malware',
      scrollTrigger: 0.8
    },
    { 
      id: 'network', 
      x: -600, y: 700, z: 500, 
      rotateX: -25, rotateY: 60, rotateZ: -15,
      color: '#f97316', 
      size: 75, 
      name: 'Network',
      scrollTrigger: 0.95
    }
  ]

  // Update camera position based on scroll - true 3D camera movement
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Find the current waypoint based on scroll position
      const currentWaypoint = waypoints.find(waypoint => 
        latest >= waypoint.scrollTrigger && 
        latest < (waypoints[waypoints.indexOf(waypoint) + 1]?.scrollTrigger || 1)
      ) || waypoints[0]

      // Find the next waypoint for smooth interpolation
      const currentIndex = waypoints.indexOf(currentWaypoint)
      const nextWaypoint = waypoints[currentIndex + 1] || waypoints[0]
      
      // Calculate progress between current and next waypoint
      const waypointProgress = (latest - currentWaypoint.scrollTrigger) / 
        ((nextWaypoint.scrollTrigger - currentWaypoint.scrollTrigger) || 1)
      
      // Interpolate between waypoints for smooth camera movement
      const targetX = currentWaypoint.x + (nextWaypoint.x - currentWaypoint.x) * waypointProgress
      const targetY = currentWaypoint.y + (nextWaypoint.y - currentWaypoint.y) * waypointProgress
      const targetZ = currentWaypoint.z + (nextWaypoint.z - currentWaypoint.z) * waypointProgress
      const targetRotateX = currentWaypoint.rotateX + (nextWaypoint.rotateX - currentWaypoint.rotateX) * waypointProgress
      const targetRotateY = currentWaypoint.rotateY + (nextWaypoint.rotateY - currentWaypoint.rotateY) * waypointProgress
      const targetRotateZ = currentWaypoint.rotateZ + (nextWaypoint.rotateZ - currentWaypoint.rotateZ) * waypointProgress

      // Update camera position - the camera moves through space
      cameraX.set(targetX)
      cameraY.set(targetY)
      cameraZ.set(targetZ)
      cameraRotateX.set(targetRotateX)
      cameraRotateY.set(targetRotateY)
      cameraRotateZ.set(targetRotateZ)
    })

    return unsubscribe
  }, [scrollYProgress, cameraX, cameraY, cameraZ, cameraRotateX, cameraRotateY, cameraRotateZ, waypoints])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* 3D Scene Container */}
      <motion.div
        className="absolute inset-0"
        style={{
          perspective: '2000px',
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        {/* Camera Container - This moves through 3D space */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: springCameraX,
            y: springCameraY,
            z: springCameraZ,
            rotateX: springRotateX,
            rotateY: springRotateY,
            rotateZ: springRotateZ,
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          {/* Galaxy Background - Pure black space, no overlays */}
          <div 
            className="absolute inset-0 bg-black"
            style={{
              transform: 'translateZ(-1000px)'
            }}
          />

          {/* Stars Field - Multiple layers for depth */}
          {[...Array(3)].map((_, layer) => (
            <motion.div
              key={layer}
              className="absolute inset-0"
              style={{
                transform: `translateZ(${-500 - layer * 200}px)`,
                opacity: 0.6 - layer * 0.2
              }}
              animate={{
                rotateZ: [0, 360]
              }}
              transition={{
                duration: 100 + layer * 50,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.8 + 0.2,
                    transform: `scale(${Math.random() * 0.5 + 0.5})`
                  }}
                />
              ))}
            </motion.div>
          ))}

          {/* Planets - Fixed positions in 3D space */}
          {waypoints.map((planet, index) => {
            const planetProgress = useTransform(
              scrollYProgress,
              [planet.scrollTrigger - 0.1, planet.scrollTrigger + 0.1],
              [0, 1]
            )
            
            const planetScale = useTransform(planetProgress, [0, 0.5, 1], [0.3, 1.2, 0.3])
            const planetOpacity = useTransform(planetProgress, [0, 0.2, 0.8, 1], [0.2, 1, 1, 0.2])
            const planetGlow = useTransform(planetProgress, [0, 0.5, 1], [0, 1, 0])

            return (
              <motion.div
                key={planet.id}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  width: planet.size,
                  height: planet.size,
                  x: planet.x,
                  y: planet.y,
                  z: planet.z,
                  scale: planetScale,
                  opacity: planetOpacity,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 15, 0, -15, 0],
                  rotateZ: [0, 5, 0, -5, 0]
                }}
                transition={{
                  rotateY: { duration: 20 + index * 5, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 8 + index * 2, repeat: Infinity, ease: "easeInOut" },
                  rotateZ: { duration: 12 + index * 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Main Planet Sphere */}
                <motion.div
                  className="absolute inset-0 rounded-full overflow-hidden"
                  style={{
                    background: `
                      radial-gradient(circle at 40% 40%, rgba(255,255,255,0.8) 0%, transparent 20%),
                      radial-gradient(circle at 35% 35%, #ffffff 0%, #ffd700 15%, ${planet.color} 40%, ${planet.color}dd 100%),
                      radial-gradient(ellipse at 60% 60%, rgba(0,0,0,0.3) 0%, transparent 50%)
                    `,
                    boxShadow: `0 0 ${planet.size * 4}px ${planet.color}aa, 0 0 ${planet.size * 6}px ${planet.color}66, 0 0 ${planet.size * 8}px ${planet.color}33`,
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                    transform: 'translateZ(0)'
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 ${planet.size * 4}px ${planet.color}aa, 0 0 ${planet.size * 6}px ${planet.color}66, 0 0 ${planet.size * 8}px ${planet.color}33`,
                      `0 0 ${planet.size * 5}px ${planet.color}cc, 0 0 ${planet.size * 7}px ${planet.color}88, 0 0 ${planet.size * 9}px ${planet.color}55`,
                      `0 0 ${planet.size * 4}px ${planet.color}aa, 0 0 ${planet.size * 6}px ${planet.color}66, 0 0 ${planet.size * 8}px ${planet.color}33`
                    ]
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Atmospheric Rim Glow */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, transparent 0%, transparent 85%, ${planet.color}22 95%, ${planet.color}44 100%)`,
                      filter: 'blur(2px)'
                    }}
                  />
                  
                  {/* Surface Texture Layer */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `
                        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 25%),
                        radial-gradient(circle at 80% 80%, rgba(0,0,0,0.3) 0%, transparent 30%),
                        radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 40%)
                      `,
                      mixBlendMode: 'overlay'
                    }}
                  />
                </motion.div>

                {/* Outer Corona Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, transparent 0%, transparent 70%, ${planet.color}33 85%, transparent 100%)`,
                    filter: 'blur(8px)',
                    transform: 'scale(1.5)'
                  }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1.5, 1.8, 1.5]
                  }}
                  transition={{
                    duration: 4 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Planet Label */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium"
                  style={{
                    opacity: planetOpacity,
                    textShadow: `0 0 10px ${planet.color}, 0 0 20px ${planet.color}88`
                  }}
                >
                  {planet.name}
                </motion.div>
              </motion.div>
            )
          })}

          {/* Warp Speed Lines - Enhanced for better visibility */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
              transform: 'translateZ(100px)'
            }}
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-40 bg-gradient-to-b from-transparent via-red-500 to-transparent"
                style={{
                  left: `${3 + i * 3}%`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  transformOrigin: 'center'
                }}
                animate={{
                  scaleY: [0, 3, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.05
                }}
              />
            ))}
          </motion.div>

          {/* Data Transfer Particles - More prominent */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
              transform: 'translateZ(200px)'
            }}
          >
            {[...Array(80)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-red-500 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translateZ(${Math.random() * 1000 - 500}px)`
                }}
                animate={{
                  x: [0, Math.random() * 600 - 300],
                  y: [0, Math.random() * 600 - 300],
                  z: [0, Math.random() * 600 - 300],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 3
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}