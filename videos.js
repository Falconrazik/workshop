import _ from 'lodash';

const videos = [
    {
        file: require('./assets/videos/humphreytalks/humphreytalks_1.mp4'),
        creatorUID: 'eqcLHaUvgEX2BtBJmXrojzg16eI3',
        thumbnail: require('./assets/videos/humphreytalks/humphreytalks_1.png'),
    },
    {
        file: require('./assets/videos/jodielangle/jodielangle_1.mp4'),
        creatorUID: 'fAtArzlJYIZh7hY6R0Yos3skhak2',
        thumbnail: require('./assets/videos/jodielangle/jodielangle_1.png'),
    },
    {
        file: require('./assets/videos/j-crawf0rd/j-crawf0rd_1.mp4'),
        creatorUID: 'QvmVLZ0Bxmc5GW5QNuTKfQSOEwt2',
        thumbnail: require('./assets/videos/j-crawf0rd/j-crawf0rd_1.png'),
    },
    {
        file: require('./assets/videos/notyourbasicvocalcoach/notyourbasicvocalcoach_1.mp4'),
        creatorUID: 'd9tguGBF7KfsV9FyVMFUbNrmDAC3',
        thumbnail: require('./assets/videos/notyourbasicvocalcoach/notyourbasicvocalcoach_1.png'),
    },
    {
        file: require('./assets/videos/krysteldallas_yoga/krysteldallas_yoga_1.mp4'),
        creatorUID: 'zL2atRlPjST2fUSpMwWt',
        thumbnail: require('./assets/videos/krysteldallas_yoga/krysteldallas_yoga_1.png'),
    },
    {
        file: require('./assets/videos/agent.envy/agent.envy_1.mp4'),
        creatorUID: 'IvFCxx49yLfgli8bzrw44PQ8qgq2',
        thumbnail: require('./assets/videos/agent.envy/agent.envy_1.png'),
    },
    {
        file: require('./assets/videos/johnsfinancetips/johnsfinancetips_1.mp4'),
        creatorUID: 'LhpizUPucfNZnliKL937VjzurSj1',
        thumbnail: require('./assets/videos/johnsfinancetips/johnsfinancetips_1.png'),
    },
    {
        file: require('./assets/videos/j-crawf0rd/j-crawf0rd_2.mp4'),
        creatorUID: 'QvmVLZ0Bxmc5GW5QNuTKfQSOEwt2',
        thumbnail: require('./assets/videos/j-crawf0rd/j-crawf0rd_2.png'),
    },
    {
        file: require('./assets/videos/jodielangle/jodielangle_2.mp4'),
        creatorUID: 'fAtArzlJYIZh7hY6R0Yos3skhak2',
        thumbnail: require('./assets/videos/jodielangle/jodielangle_2.png'),
    },
    {
        file: require('./assets/videos/_joeandrews/_joeandrews_1.mp4'),
        creatorUID: 'LnGnI2tlmJTFbCiNxP9f',
        thumbnail: require('./assets/videos/_joeandrews/_joeandrews_1.png'),
    },
    {
        file: require('./assets/videos/johnsfinancetips/johnsfinancetips_2.mp4'),
        creatorUID: 'LhpizUPucfNZnliKL937VjzurSj1',
        thumbnail: require('./assets/videos/johnsfinancetips/johnsfinancetips_2.png'),
    },
    {
        file: require('./assets/videos/notyourbasicvocalcoach/notyourbasicvocalcoach_2.mp4'),
        creatorUID: 'd9tguGBF7KfsV9FyVMFUbNrmDAC3',
        thumbnail: require('./assets/videos/notyourbasicvocalcoach/notyourbasicvocalcoach_2.png'),
    },
    {
        file: require('./assets/videos/humphreytalks/humphreytalks_2.mp4'),
        creatorUID: 'eqcLHaUvgEX2BtBJmXrojzg16eI3',
        thumbnail: require('./assets/videos/humphreytalks/humphreytalks_2.png'),
    },
    {
        file: require('./assets/videos/jodielangle/jodielangle_3.mp4'),
        creatorUID: 'fAtArzlJYIZh7hY6R0Yos3skhak2',
        thumbnail: require('./assets/videos/jodielangle/jodielangle_3.png'),
    },
    {
        file: require('./assets/videos/yogawithcali/yogawithcali_3.mp4'),
        creatorUID: 'vw8tG7fojQlo4f4Q3HcI',
        thumbnail: require('./assets/videos/yogawithcali/yogawithcali_3.png'),
    },
    {
        file: require('./assets/videos/notyourbasicvocalcoach/notyourbasicvocalcoach_3.mp4'),
        creatorUID: 'd9tguGBF7KfsV9FyVMFUbNrmDAC3',
        thumbnail: require('./assets/videos/notyourbasicvocalcoach/notyourbasicvocalcoach_3.png'),
    },
    {
        file: require('./assets/videos/j-crawf0rd/j-crawf0rd_3.mp4'),
        creatorUID: 'QvmVLZ0Bxmc5GW5QNuTKfQSOEwt2',
        thumbnail: require('./assets/videos/j-crawf0rd/j-crawf0rd_3.png'),
    },
    {
        file: require('./assets/videos/johnefinance/johnefinance_1.mp4'),
        creatorUID: 'LzuHXQROAEWpuFHUFTY1CbXzWuV2',
        thumbnail: require('./assets/videos/johnefinance/johnefinance_1.png'),
    },
    // {
    //     file: require('./assets/videos/jay.iverson/jay.iverson_2.mp4'),
    //     creatorUID: 'wUGdTJJfLLvf0mxT87zj',
    //     thumbnail: require('./assets/videos/jay.iverson/jay.iverson_2.png')
    // },
    {
        file: require('./assets/videos/humphreytalks/humphreytalks_3.mp4'),
        creatorUID: 'eqcLHaUvgEX2BtBJmXrojzg16eI3',
        thumbnail: require('./assets/videos/humphreytalks/humphreytalks_3.png'),
    },
    {
        file: require('./assets/videos/krysteldallas_yoga/krysteldallas_yoga_2.mp4'),
        creatorUID: 'zL2atRlPjST2fUSpMwWt',
        thumbnail: require('./assets/videos/krysteldallas_yoga/krysteldallas_yoga_2.png'),
    },
    {
        file: require('./assets/videos/agent.envy/agent.envy_2.mp4'),
        creatorUID: 'IvFCxx49yLfgli8bzrw44PQ8qgq2',
        thumbnail: require('./assets/videos/agent.envy/agent.envy_2.png'),
    },
    {
        file: require('./assets/videos/johnefinance/johnefinance_2.mp4'),
        creatorUID: 'LzuHXQROAEWpuFHUFTY1CbXzWuV2',
        thumbnail: require('./assets/videos/johnefinance/johnefinance_2.png'),
    },
    {
        file: require('./assets/videos/yogawithcali/yogawithcali_2.mp4'),
        creatorUID: 'vw8tG7fojQlo4f4Q3HcI',
        thumbnail: require('./assets/videos/yogawithcali/yogawithcali_2.png'),
    },
    {
        file: require('./assets/videos/johnefinance/johnefinance_3.mp4'),
        creatorUID: 'LzuHXQROAEWpuFHUFTY1CbXzWuV2',
        thumbnail: require('./assets/videos/johnefinance/johnefinance_3.png'),
    },
    {
        file: require('./assets/videos/krysteldallas_yoga/krysteldallas_yoga_3.mp4'),
        creatorUID: 'zL2atRlPjST2fUSpMwWt',
        thumbnail: require('./assets/videos/krysteldallas_yoga/krysteldallas_yoga_3.png'),
    },
    {
        file: require('./assets/videos/agent.envy/agent.envy_3.mp4'),
        creatorUID: 'IvFCxx49yLfgli8bzrw44PQ8qgq2',
        thumbnail: require('./assets/videos/agent.envy/agent.envy_3.png'),
    },
    {
        file: require('./assets/videos/johnsfinancetips/johnsfinancetips_3.mp4'),
        creatorUID: 'LhpizUPucfNZnliKL937VjzurSj1',
        thumbnail: require('./assets/videos/johnsfinancetips/johnsfinancetips_3.png'),
    },
    // {
    //     file: require('./assets/videos/vanity_makeup/vanity_makeup_2.mp4'),
    //     creatorUID: 'LFrt0j6DJk1stE1t90QP',
    //     thumbnail: require('./assets/videos/vanity_makeup/vanity_makeup_2.png')
    // },
    // {
    //     file: require('./assets/videos/jay.iverson/jay.iverson_3.mp4'),
    //     creatorUID: 'wUGdTJJfLLvf0mxT87zj',
    //     thumbnail: require('./assets/videos/jay.iverson/jay.iverson_3.png')
    // },
    {
        file: require('./assets/videos/nylenayga/nylanayga_2.mp4'),
        creatorUID: 'kRd4ZqIqlQNxhImyqiM6',
        thumbnail: require('./assets/videos/nylenayga/nylanayga_2.png'),
    },
    // {
    //     file: require('./assets/videos/vanity_makeup/vanity_makeup_3.mp4'),
    //     creatorUID: 'LFrt0j6DJk1stE1t90QP',
    //     thumbnail: require('./assets/videos/vanity_makeup/vanity_makeup_3.png')
    // },
    {
        file: require('./assets/videos/_joeandrews/_joeandrews_2.mp4'),
        creatorUID: 'LnGnI2tlmJTFbCiNxP9f',
        thumbnail: require('./assets/videos/_joeandrews/_joeandrews_2.png'),

    },
    {
        file: require('./assets/videos/nylenayga/nylanayga_1.mp4'),
        creatorUID: 'kRd4ZqIqlQNxhImyqiM6',
        thumbnail: require('./assets/videos/nylenayga/nylanayga_1.png'),
    },
    {
        file: require('./assets/videos/richinvesting/richinvesting_3.mp4'),
        creatorUID: '8Dpv8bR8lzMKVev9W2dRo3doBun1',
        thumbnail: require('./assets/videos/richinvesting/richinvesting_3.png'),
    },
    {
        file: require('./assets/videos/_joeandrews/_joeandrews_3.mp4'),
        creatorUID: 'LnGnI2tlmJTFbCiNxP9f',
        thumbnail: require('./assets/videos/_joeandrews/_joeandrews_3.png'),
    },
    {
        file: require('./assets/videos/richinvesting/richinvesting_2.mp4'),
        creatorUID: '8Dpv8bR8lzMKVev9W2dRo3doBun1',
        thumbnail: require('./assets/videos/richinvesting/richinvesting_2.png'),
    },
    {
        file: require('./assets/videos/richinvesting/richinvesting_1.mp4'),
        creatorUID: '8Dpv8bR8lzMKVev9W2dRo3doBun1',
        thumbnail: require('./assets/videos/richinvesting/richinvesting_1.png'),
    },
    // {
    //     file: require('./assets/videos/vanity_makeup/vanity_makeup_1.mp4'),
    //     creatorUID: 'LFrt0j6DJk1stE1t90QP',
    //     thumbnail: require('./assets/videos/vanity_makeup/vanity_makeup_1.png')
    // },
    // {
    //     file: require('./assets/videos/jay.iverson/jay.iverson_1.mp4'),
    //     creatorUID: 'wUGdTJJfLLvf0mxT87zj',
    //     thumbnail: require('./assets/videos/jay.iverson/jay.iverson_1.png')
    // },
    // {
    //     file: require('./assets/videos/jyooonie/jyooonie_1.mp4'),
    //     creatorUID: '4kmBavbvuiYrvnBd4ATc',
    //     thumbnail: require('./assets/videos/jyooonie/jyooonie_1.png')
    // },
    // {
    //     file: require('./assets/videos/jyooonie/jyooonie_2.mp4'),
    //     creatorUID: '4kmBavbvuiYrvnBd4ATc',
    //     thumbnail: require('./assets/videos/jyooonie/jyooonie_2.png')
    // },
    // {
    //     file: require('./assets/videos/jyooonie/jyooonie_3.mp4'),
    //     creatorUID: '4kmBavbvuiYrvnBd4ATc',
    //     thumbnail: require('./assets/videos/jyooonie/jyooonie_3.png')
    // },
    // {
    //     file: require('./assets/videos/kennnnito/kennnnito_1.mp4'),
    //     creatorUID: 'WrWec4sd6Hm4NPWZYWZR',
    //     thumbnail: require('./assets/videos/kennnnito/kennnnito_1.png')
    // },
    // {
    //     file: require('./assets/videos/kennnnito/kennnnito_2.mp4'),
    //     creatorUID: 'WrWec4sd6Hm4NPWZYWZR',
    //     thumbnail: require('./assets/videos/kennnnito/kennnnito_2.png')
    // },
    // {
    //     file: require('./assets/videos/kennnnito/kennnnito_3.mp4'),
    //     creatorUID: 'WrWec4sd6Hm4NPWZYWZR',
    //     thumbnail: require('./assets/videos/kennnnito/kennnnito_3.png')
    // },


];

export default _.shuffle(videos);
