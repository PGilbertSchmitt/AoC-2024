export const sample = `
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

export const input = `
#############################################################################################################################################
#...#...#.....###...#...#.......#...#...#...#...#...#.........###...#.......#...#...###...#...#...............###...###.....#.....###...#...#
#.#.#.#.#.###.###.#.#.#.#.#####.#.#.#.#.#.#.#.#.#.#.#.#######.###.#.#.#####.#.#.#.#.###.#.#.#.#.#############.###.#.###.###.#.###.###.#.#.#.#
#.#...#.#.#...#...#...#...#...#.#.#.#.#...#...#.#.#.#...#...#.#...#...#...#...#...#...#.#.#.#.#.....#.........#...#.#...#...#.#...#...#...#.#
#.#####.#.#.###.###########.#.#.#.#.#.#########.#.#.###.#.#.#.#.#######.#.###########.#.#.#.#.#####.#.#########.###.#.###.###.#.###.#######.#
#.....#...#...#.........#...#...#.#.#.#.........#.#.###.#.#...#.....#...#...#.........#.#...#...#...#.#...###...#...#...#...#.#.#...#...#...#
#####.#######.#########.#.#######.#.#.#.#########.#.###.#.#########.#.#####.#.#########.#######.#.###.#.#.###.###.#####.###.#.#.#.###.#.#.###
#...#...#.....#...#...#.#.###.....#...#...#...#...#...#.#...#...###...#...#.#.#...#...#.#.......#...#.#.#.....#...#.....#...#.#.#...#.#.#...#
#.#.###.#.#####.#.#.#.#.#.###.###########.#.#.#.#####.#.###.#.#.#######.#.#.#.#.#.#.#.#.#.#########.#.#.#######.###.#####.###.#.###.#.#.###.#
#.#...#.#.###...#...#.#.#...#.....#...#...#.#.#.....#.#.#...#.#.#.....#.#.#.#...#.#.#...#.#...#...#.#.#.#.......###.....#...#.#.#...#.#.....#
#.###.#.#.###.#######.#.###.#####.#.#.#.###.#.#####.#.#.#.###.#.#.###.#.#.#.#####.#.#####.#.#.#.#.#.#.#.#.#############.###.#.#.#.###.#######
#.#...#.#...#.......#.#...#.....#...#.#...#.#...###.#...#.....#.#...#...#.#.#.....#...#...#.#...#.#.#...#.....#...#...#...#.#.#.#...#...#...#
#.#.###.###.#######.#.###.#####.#####.###.#.###.###.###########.###.#####.#.#.#######.#.###.#####.#.#########.#.#.#.#.###.#.#.#.###.###.#.#.#
#.#...#...#...#...#.#.###...#...#.....#...#.#...#...#...........###.....#...#.#.......#.....#.....#...#...#...#.#...#.#...#.#.#...#.#...#.#.#
#.###.###.###.#.#.#.#.#####.#.###.#####.###.#.###.###.#################.#####.#.#############.#######.#.#.#.###.#####.#.###.#.###.#.#.###.#.#
#...#.###...#...#.#.#.....#.#...#.....#.#...#...#.#...#.......###...###...#...#.#.....#...#...###...#.#.#...###.....#.#.#...#...#.#.#.....#.#
###.#.#####.#####.#.#####.#.###.#####.#.#.#####.#.#.###.#####.###.#.#####.#.###.#.###.#.#.#.#####.#.#.#.###########.#.#.#.#####.#.#.#######.#
###.#.#...#.....#.#.....#...#...###...#...#.....#.#.###...#...#...#.#.....#...#...###.#.#...#...#.#.#.#.###...#...#.#.#.#.#####.#.#.#.......#
###.#.#.#.#####.#.#####.#####.#####.#######.#####.#.#####.#.###.###.#.#######.#######.#.#####.#.#.#.#.#.###.#.#.#.#.#.#.#.#####.#.#.#.#######
#...#.#.#.###...#...###.....#.#...#.....#...#...#.#...#...#...#...#.#.......#.###.....#...#...#...#...#.#...#.#.#.#.#.#.#...#...#...#.#.....#
#.###.#.#.###.#####.#######.#.#.#.#####.#.###.#.#.###.#.#####.###.#.#######.#.###.#######.#.###########.#.###.#.#.#.#.#.###.#.#######.#.###.#
#...#.#.#...#.....#.........#...#...#...#.###.#.#.#...#.#.....#...#.#.......#...#.....#...#...#.........#...#...#...#.#.#...#...#.....#.#...#
###.#.#.###.#####.#################.#.###.###.#.#.#.###.#.#####.###.#.#########.#####.#.#####.#.###########.#########.#.#.#####.#.#####.#.###
#...#.#...#.#...#...............#...#...#.#...#...#.....#.#...#...#.#.......#...#...#.#.#...#.#...###.....#.......#...#.#.#...#.#.#...#.#...#
#.###.###.#.#.#.###############.#.#####.#.#.#############.#.#.###.#.#######.#.###.#.#.#.#.#.#.###.###.###.#######.#.###.#.#.#.#.#.#.#.#.###.#
#...#.###.#.#.#.#...#...###...#.#.#...#.#.#.......#.......#.#.#...#...#...#.#.#...#.#.#...#.#...#...#...#.#...###.#.....#.#.#.#.#...#...#...#
###.#.###.#.#.#.#.#.#.#.###.#.#.#.#.#.#.#.#######.#.#######.#.#.#####.#.#.#.#.#.###.#.#####.###.###.###.#.#.#.###.#######.#.#.#.#########.###
#...#.....#.#.#.#.#...#.....#.#.#.#.#.#.#...###...#...#.....#.#.....#...#.#.#.#...#...#...#...#.#...###.#.#.#.#...#.....#.#.#.#.#...#...#...#
#.#########.#.#.#.###########.#.#.#.#.#.###.###.#####.#.#####.#####.#####.#.#.###.#####.#.###.#.#.#####.#.#.#.#.###.###.#.#.#.#.#.#.#.#.###.#
#.........#...#...#.........#...#.#.#.#...#...#...#...#.....#.#...#.....#.#.#.#...#.....#.....#.#.#...#.#.#.#...#...###...#.#.#.#.#...#.#...#
#########.#########.#######.#####.#.#.###.###.###.#.#######.#.#.#.#####.#.#.#.#.###.###########.#.#.#.#.#.#.#####.#########.#.#.#.#####.#.###
#.........#...#...#.#.......#...#.#.#...#...#...#.#.#...#...#...#.#.....#.#.#.#...#.....#...#...#.#.#.#.#.#...#...#...#...#.#...#.....#...###
#.#########.#.#.#.#.#.#######.#.#.#.###.###.###.#.#.#.#.#.#######.#.#####.#.#.###.#####.#.#.#.###.#.#.#.#.###.#.###.#.#.#.#.#########.#######
#.....#.....#...#.#.#...#.....#.#.#.#...###.#...#.#.#.#.#.....#...#...#...#.#.###...#...#.#.#.#...#.#.#.#.#...#.....#...#...#.........#...###
#####.#.#########.#.###.#.#####.#.#.#.#####.#.###.#.#.#.#####.#.#####.#.###.#.#####.#.###.#.#.#.###.#.#.#.#.#################.#########.#.###
#.....#.###...###...###...#.....#...#...#...#.#...#.#.#...#...#.#...#.#...#.#.#...#.#...#.#.#.#...#.#...#...#.........#.....#...#...#...#...#
#.#####.###.#.#############.###########.#.###.#.###.#.###.#.###.#.#.#.###.#.#.#.#.#.###.#.#.#.###.#.#########.#######.#.###.###.#.#.#.#####.#
#...#...#...#.......#...#...###########.#...#.#.###.#.#...#...#.#.#.#...#.#.#.#.#...#...#.#.#.#...#.#.......#.....#...#...#.....#.#...#.....#
###.#.###.#########.#.#.#.#############.###.#.#.###.#.#.#####.#.#.#.###.#.#.#.#.#####.###.#.#.#.###.#.#####.#####.#.#####.#######.#####.#####
#...#...#...#.....#...#...#############...#.#.#.#...#.#...#...#.#.#...#.#...#.#...###...#.#.#.#...#.#.#...#.......#.#...#.........#...#.#...#
#.#####.###.#.###.#######################.#.#.#.#.###.###.#.###.#.###.#.#####.###.#####.#.#.#.###.#.#.#.#.#########.#.#.###########.#.#.#.#.#
#.......#...#.#...#...###################...#.#.#.#...###...#...#.#...#...###...#...###...#.#.###.#.#...#.......#...#.#.#...#.....#.#.#...#.#
#########.###.#.###.#.#######################.#.#.#.#########.###.#.#####.#####.###.#######.#.###.#.###########.#.###.#.#.#.#.###.#.#.#####.#
#...#...#.....#...#.#E#######################...#.#.......###...#.#.#...#.....#.#...#.......#...#...#...#.......#.....#...#.#...#.#.#...#...#
#.#.#.#.#########.#.#############################.#######.#####.#.#.#.#.#####.#.#.###.#########.#####.#.#.#################.###.#.#.###.#.###
#.#.#.#.#...#...#...###########...#...#...#######...#.....#...#.#.#.#.#.#.....#.#.#...#.....#...#.....#...#...............#...#.#.#...#...###
#.#.#.#.#.#.#.#.###############.#.#.#.#.#.#########.#.#####.#.#.#.#.#.#.#.#####.#.#.###.###.#.###.#########.#############.###.#.#.###.#######
#.#...#.#.#...#...#...#...#.....#.#.#...#...#S....#.#.#.....#...#.#...#...#.....#.#.....#...#.###...#.....#...#...........###.#.#...#...#...#
#.#####.#.#######.#.#.#.#.#.#####.#.#######.#####.#.#.#.#########.#########.#####.#######.###.#####.#.###.###.#.#############.#.###.###.#.#.#
#.#...#...#.....#...#.#.#.#.....#...#...###.......#...#.....#...#...#...###.#...#.......#...#...###...###.....#.......###...#...###...#...#.#
#.#.#.#####.###.#####.#.#.#####.#####.#.###################.#.#.###.#.#.###.#.#.#######.###.###.#####################.###.#.#########.#####.#
#.#.#.#...#.#...#...#...#.......#.....#.............#...#...#.#...#...#...#.#.#...#...#.###.#...#...#.......#...#.....#...#.....#...#.....#.#
#.#.#.#.#.#.#.###.#.#############.#################.#.#.#.###.###.#######.#.#.###.#.#.#.###.#.###.#.#.#####.#.#.#.#####.#######.#.#.#####.#.#
#.#.#.#.#...#...#.#.............#.#.................#.#.#...#.#...#.....#.#...#...#.#.#.#...#.#...#...#...#...#.#.....#.#...#...#.#.#...#.#.#
#.#.#.#.#######.#.#############.#.#.#################.#.###.#.#.###.###.#.#####.###.#.#.#.###.#.#######.#.#####.#####.#.#.#.#.###.#.#.#.#.#.#
#.#.#.#.#.......#.#.............#.#.#.....#...........#.###.#.#.#...###.#.....#...#.#.#.#.#...#.........#.#...#.......#.#.#...#...#...#.#.#.#
#.#.#.#.#.#######.#.#############.#.#.###.#.###########.###.#.#.#.#####.#####.###.#.#.#.#.#.#############.#.#.#########.#.#####.#######.#.#.#
#.#.#...#...#.....#...#...#...#...#...#...#.#...........#...#.#.#.....#...#...#...#.#...#...#.....#.......#.#.....#.....#...###...#.....#...#
#.#.#######.#.#######.#.#.#.#.#.#######.###.#.###########.###.#.#####.###.#.###.###.#########.###.#.#######.#####.#.#######.#####.#.#########
#...#...###...###...#...#...#...#.....#.....#.......#.....#...#...#...#...#.###...#...#.......#...#.........#.....#.#.......#...#.#.........#
#####.#.#########.#.#############.###.#############.#.#####.#####.#.###.###.#####.###.#.#######.#############.#####.#.#######.#.#.#########.#
#.....#.....#.....#.........#...#...#...............#.....#...#...#...#...#.#.....#...#...#...#...............#...#.#.........#...#.........#
#.#########.#.#############.#.#.###.#####################.###.#.#####.###.#.#.#####.#####.#.#.#################.#.#.###############.#########
#.........#.#.....#.......#...#.....#...................#.....#...#...###.#.#.#...#.....#...#...#...#...........#...#.....#...#.....###...###
#########.#.#####.#.#####.###########.#################.#########.#.#####.#.#.#.#.#####.#######.#.#.#.###############.###.#.#.#.#######.#.###
###...#...#.....#...#...#.............#...#.....#.....#.........#.#.....#.#.#...#.......#.......#.#.#.#.........#.....#...#.#.#...#.....#...#
###.#.#.#######.#####.#.###############.#.#.###.#.###.#########.#.#####.#.#.#############.#######.#.#.#.#######.#.#####.###.#.###.#.#######.#
#...#...#...#...###...#.................#.#...#.#...#...#...#...#.#...#.#...###...#.....#...#...#.#...#.......#.#.....#...#.#...#...#.....#.#
#.#######.#.#.#####.#####################.###.#.###.###.#.#.#.###.#.#.#.#######.#.#.###.###.#.#.#.###########.#.#####.###.#.###.#####.###.#.#
#...#.....#.#.......#...................#.....#.....###...#...###...#...###.....#...#...###...#...#...###.....#.......###...###...#...###.#.#
###.#.#####.#########.#################.###################################.#########.#############.#.###.#######################.#.#####.#.#
#...#.#.....#...#.....#.................#...#...#...###...#.....#...###...#.....#...#...#...........#...#.........#...#...###.....#.#...#...#
#.###.#.#####.#.#.#####.#################.#.#.#.#.#.###.#.#.###.#.#.###.#.#####.#.#.###.#.#############.#########.#.#.#.#.###.#####.#.#.#####
#.#...#.#.....#...#...#.....#.......#.....#...#...#...#.#...#...#.#.#...#.#...#...#.#...#.............#.....#...#...#.#.#...#.#...#...#.....#
#.#.###.#.#########.#.#####.#.#####.#.###############.#.#####.###.#.#.###.#.#.#####.#.###############.#####.#.#.#####.#.###.#.#.#.#########.#
#...###...#.........#.#...#...#...#...#.......#.......#.....#...#.#.#...#.#.#.......#.#...###.....#...#...#...#.......#.#...#...#.........#.#
###########.#########.#.#.#####.#.#####.#####.#.###########.###.#.#.###.#.#.#########.#.#.###.###.#.###.#.#############.#.###############.#.#
#.......###...#.....#.#.#.###...#.......#...#...###...#.....#...#.#.#...#.#.........#.#.#...#...#.#.....#.............#.#.........###...#...#
#.#####.#####.#.###.#.#.#.###.###########.#.#######.#.#.#####.###.#.#.###.#########.#.#.###.###.#.###################.#.#########.###.#.#####
#.#...#.#...#.#.#...#...#...#.............#...#...#.#.#.#.....#...#...#...#.......#.#.#...#.....#...............#.....#.#.........#...#...###
#.#.#.#.#.#.#.#.#.#########.#################.#.#.#.#.#.#.#####.#######.###.#####.#.#.###.#####################.#.#####.#.#########.#####.###
#...#.#.#.#.#...#.....#...#...#...#...#.....#...#...#...#...###.......#.###.....#.#.#...#...#.........#...#...#...###...#.....#.....#...#...#
#####.#.#.#.#########.#.#.###.#.#.#.#.#.###.###############.#########.#.#######.#.#.###.###.#.#######.#.#.#.#.#######.#######.#.#####.#.###.#
#.....#...#...###...#...#...#...#...#...###.#.........#...#...#.......#...#.....#...#...###...#...###...#...#.........#.......#...#...#...#.#
#.###########.###.#.#######.###############.#.#######.#.#.###.#.#########.#.#########.#########.#.#####################.#########.#.#####.#.#
#...........#...#.#.....###...............#.#...#.....#.#.....#.........#.#.........#.###.......#.#...#.........#.....#...........#.....#.#.#
###########.###.#.#####.#################.#.###.#.#####.###############.#.#########.#.###.#######.#.#.#.#######.#.###.#################.#.#.#
#.........#...#.#...#...#.....#...........#...#.#.......###...#...#.....#.#.........#...#...#.....#.#.#.......#...###.#...#...#.....#...#...#
#.#######.###.#.###.#.###.###.#.#############.#.###########.#.#.#.#.#####.#.###########.###.#.#####.#.#######.#######.#.#.#.#.#.###.#.#######
#...#...#.....#.....#.#...#...#.....#.......#...###.......#.#.#.#.#.....#.#.#...#...#...###.#.###...#.........#.....#.#.#...#.#...#...#...###
###.#.#.#############.#.###.#######.#.#####.#######.#####.#.#.#.#.#####.#.#.#.#.#.#.#.#####.#.###.#############.###.#.#.#####.###.#####.#.###
###...#...........#...#...#.###...#...#.....#.....#.....#.#.#.#.#.###...#.#...#...#.#.#...#.#...#...........#...#...#.#.....#...#.......#...#
#################.#.#####.#.###.#.#####.#####.###.#####.#.#.#.#.#.###.###.#########.#.#.#.#.###.###########.#.###.###.#####.###.###########.#
#.................#.......#.....#.....#.....#.#...#...#.#.#.#.#.#.#...#...#.........#...#.#...#...#.........#.#...###...#...###...#...#...#.#
#.###################################.#####.#.#.###.#.#.#.#.#.#.#.#.###.###.#############.###.###.#.#########.#.#######.#.#######.#.#.#.#.#.#
#.......................#...#...#...#.....#...#...#.#.#.#.#.#.#.#.#.#...###.......#.....#...#.#...#...........#...#...#.#.....###...#...#...#
#######################.#.#.#.#.#.#.#####.#######.#.#.#.#.#.#.#.#.#.#.###########.#.###.###.#.#.#################.#.#.#.#####.###############
###.......#...#...#...#...#...#.#.#.....#.........#.#.#.#.#.#.#.#.#.#.###...#.....#...#.....#.#.#.....#.........#...#.#.......#.............#
###.#####.#.#.#.#.#.#.#########.#.#####.###########.#.#.#.#.#.#.#.#.#.###.#.#.#######.#######.#.#.###.#.#######.#####.#########.###########.#
#...#...#...#...#...#...###...#...#.....###...#...#.#...#.#.#.#.#.#.#...#.#.#.....#...###...#.#.#.#...#.......#.......#...###...#...#.......#
#.###.#.###############.###.#.#####.#######.#.#.#.#.#####.#.#.#.#.#.###.#.#.#####.#.#####.#.#.#.#.#.#########.#########.#.###.###.#.#.#######
#.....#...#...#...#...#.....#.#...#...#...#.#...#.#.#...#.#.#...#.#.#...#.#.#.....#.#...#.#.#.#.#.#.#.........#...#...#.#.....#...#.#.......#
#########.#.#.#.#.#.#.#######.#.#.###.#.#.#.#####.#.#.#.#.#.#####.#.#.###.#.#.#####.#.#.#.#.#.#.#.#.#.#########.#.#.#.#.#######.###.#######.#
#.........#.#...#...#...#...#...#.....#.#.#.#.....#...#.#.#.#.....#.#.###.#.#...#...#.#.#.#.#.#.#.#.#.......#...#...#...#...#...###...#...#.#
#.#########.###########.#.#.###########.#.#.#.#########.#.#.#.#####.#.###.#.###.#.###.#.#.#.#.#.#.#.#######.#.###########.#.#.#######.#.#.#.#
#.#...#...#.#...........#.#.#.........#.#.#.#...#...#...#.#.#.#...#.#.#...#...#.#...#.#.#.#.#.#...#.#.....#...#...#...#...#.#.....###.#.#.#.#
#.#.#.#.#.#.#.###########.#.#.#######.#.#.#.###.#.#.#.###.#.#.#.#.#.#.#.#####.#.###.#.#.#.#.#.#####.#.###.#####.#.#.#.#.###.#####.###.#.#.#.#
#.#.#...#...#.........#...#...#.......#.#...#...#.#.#.#...#.#.#.#...#.#.#.....#.#...#.#.#.#.#.#.....#.#...#.....#.#.#...#...#...#...#...#.#.#
#.#.#################.#.#######.#######.#####.###.#.#.#.###.#.#.#####.#.#.#####.#.###.#.#.#.#.#.#####.#.###.#####.#.#####.###.#.###.#####.#.#
#.#.#.................#.###...#...#...#.....#...#.#.#.#...#.#.#.....#.#.#...#...#.#...#.#.#.#.#.#...#.#...#.....#...#...#.....#.....#...#...#
#.#.#.#################.###.#.###.#.#.#####.###.#.#.#.###.#.#.#####.#.#.###.#.###.#.###.#.#.#.#.#.#.#.###.#####.#####.#.#############.#.#####
#...#...#.....#...#...#.#...#.....#.#.#...#.#...#.#.#.#...#.#.#...#.#.#.#...#...#.#.###.#.#.#.#.#.#.#.#...#...#.......#...............#.....#
#######.#.###.#.#.#.#.#.#.#########.#.#.#.#.#.###.#.#.#.###.#.#.#.#.#.#.#.#####.#.#.###.#.#.#.#.#.#.#.#.###.#.#############################.#
#.....#...###...#...#...#.......#...#...#...#.#...#...#.....#.#.#...#...#.#.....#.#...#.#.#.#.#.#.#.#.#...#.#.#...#...#.....#...#...#...#...#
#.###.#########################.#.###########.#.#############.#.#########.#.#####.###.#.#.#.#.#.#.#.#.###.#.#.#.#.#.#.#.###.#.#.#.#.#.#.#.###
#...#.....#.......#...#.........#...#.........#.....#.........#.........#.#...#...#...#...#...#.#.#.#.#...#.#.#.#.#.#.#...#...#.#.#.#.#.#.###
###.#####.#.#####.#.#.#.###########.#.#############.#.#################.#.###.#.###.###########.#.#.#.#.###.#.#.#.#.#.###.#####.#.#.#.#.#.###
###.#...#...#...#...#...#.......#...#...#.....#...#.#.#.....#.....#.....#.#...#...#.###.....#...#.#.#.#...#.#...#...#...#...###.#.#...#.#...#
###.#.#.#####.#.#########.#####.#.#####.#.###.#.#.#.#.#.###.#.###.#.#####.#.#####.#.###.###.#.###.#.#.###.#.###########.###.###.#.#####.###.#
#...#.#...#...#...#...#...#.....#.....#.#.#...#.#...#...###.#...#.#...#...#...#...#...#...#...#...#...#...#...###...###...#...#.#.....#...#.#
#.###.###.#.#####.#.#.#.###.#########.#.#.#.###.###########.###.#.###.#.#####.#.#####.###.#####.#######.#####.###.#.#####.###.#.#####.###.#.#
#.#...#...#...#...#.#.#.###.........#.#...#...#...........#...#.#.#...#.....#.#.#...#...#.....#.....#...#...#.....#.....#...#.#...#...###...#
#.#.###.#####.#.###.#.#.###########.#.#######.###########.###.#.#.#.#######.#.#.#.#.###.#####.#####.#.###.#.###########.###.#.###.#.#########
#...###.......#...#.#.#.#...........#...#...#...#.....#...#...#.#.#.......#...#.#.#...#...#...#...#.#...#.#...#...#...#...#.#.###.#.........#
#################.#.#.#.#.#############.#.#.###.#.###.#.###.###.#.#######.#####.#.###.###.#.###.#.#.###.#.###.#.#.#.#.###.#.#.###.#########.#
#...#.............#.#...#.........#...#...#.###.#...#.#.###...#.#.........###...#.###...#.#...#.#.#.#...#...#.#.#...#...#.#.#...#.#.....#...#
#.#.#.#############.#############.#.#.#####.###.###.#.#.#####.#.#############.###.#####.#.###.#.#.#.#.#####.#.#.#######.#.#.###.#.#.###.#.###
#.#.#...........#...###...........#.#...#...#...#...#...#.....#.............#...#.#.....#.###.#.#.#.#.#.....#.#.......#.#.#...#.#.#...#...###
#.#.###########.#.#####.###########.###.#.###.###.#######.#################.###.#.#.#####.###.#.#.#.#.#.#####.#######.#.#.###.#.#.###.#######
#.#.#...#.......#.....#...#.....#...###...###...#.......#.#.....#...........###...#.#...#.#...#.#.#.#.#...#...#...#...#.#...#...#...#.....###
#.#.#.#.#.###########.###.#.###.#.#############.#######.#.#.###.#.#################.#.#.#.#.###.#.#.#.###.#.###.#.#.###.###.#######.#####.###
#.#...#...#...#...#...###...###.#...#...........#...#...#.#.#...#...............###.#.#.#.#.#...#.#.#.#...#...#.#.#.###...#.......#.#...#...#
#.#########.#.#.#.#.###########.###.#.###########.#.#.###.#.#.#################.###.#.#.#.#.#.###.#.#.#.#####.#.#.#.#####.#######.#.#.#.###.#
#...#.......#.#.#.#.....###.....#...#.....#...#...#.#...#...#...#.....#.........#...#.#.#.#.#...#.#.#.#.....#.#.#.#.#.....#...#...#.#.#.#...#
###.#.#######.#.#.#####.###.#####.#######.#.#.#.###.###.#######.#.###.#.#########.###.#.#.#.###.#.#.#.#####.#.#.#.#.#.#####.#.#.###.#.#.#.###
#...#...#.....#.#.#...#.#...#...#.....###...#.#.###.....#.......#.###.#.....###...#...#.#.#.#...#.#.#...#...#...#.#.#.#...#.#...#...#.#.#...#
#.#####.#.#####.#.#.#.#.#.###.#.#####.#######.#.#########.#######.###.#####.###.###.###.#.#.#.###.#.###.#.#######.#.#.#.#.#.#####.###.#.###.#
#...#...#.#...#.#.#.#.#.#...#.#...#...#.......#.........#.#.....#...#.#...#...#.#...#...#.#.#...#.#...#.#...#.....#.#.#.#.#.....#...#.#...#.#
###.#.###.#.#.#.#.#.#.#.###.#.###.#.###.###############.#.#.###.###.#.#.#.###.#.#.###.###.#.###.#.###.#.###.#.#####.#.#.#.#####.###.#.###.#.#
###...###...#...#...#...###...###...###.................#...###.....#...#.....#...###.....#.....#.....#.....#.......#...#.......###...###...#
#############################################################################################################################################
`;
